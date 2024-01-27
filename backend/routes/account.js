const express=require('express');
const { account } = require('../db');
const { authMiddleware } = require('../middleware');
const mongoose=require('mongoose');
const app = express();

app.use(express.json());

const router= express.Router();

router.get('/balance',authMiddleware,async (req,res)=>{
    const userId= req.userId;

    const userAccount=await account.findOne({userId:userId});
    res.status(200).json({
        "balance": userAccount.balance
    })       
}) 

router.post('/transfer',authMiddleware,async (req,res)=>{
    const to = req.body.to;
    const amount = req.body.amount;
    const from = req.userId;

    const session=await mongoose.startSession();
    session.startTransaction();

    //when transaction should fail
    const fromAcc= await account.findOne({userId:from}).session(session);
    const toAcc= await account.findOne({userId:to}).session(session);
    if(!fromAcc || !toAcc){
        await session.abortTransaction();
        return res.status(400).json({
            "msg":"Invalid Account"
        })
    }
    else if(amount<0){
        await session.abortTransaction();
        return res.status(400).json({
            "msg":"Enter a valid amount"
        })
    }
    else if(account.balance<amount){
        await session.abortTransaction();
        return res.status(400).json({
            "msg":"Insufficient Balance"
        })
    }
    else{

        //Logic after doing relevant checks
        await account.updateOne({userId:from},{
            $inc:{balance : -amount}
        }).session(session);
    
        await account.updateOne({userId:to},{
            $inc:{balance: amount}
        }).session(session);

        await session.commitTransaction();

        return res.json({
            "msg" : "Transaction Successful"
        })

    }
    
})

// ----> checking transfer routes


// async function transfer(req){
//     const to = req.body.to;
//     const amount = req.body.amount;
//     const from = req.userId;

//     const session=await mongoose.startSession();
//     session.startTransaction();

//     //when transaction should fail
//     const fromAcc= await account.findOne({userId:from}).session(session);
//     const toAcc= await account.findOne({userId:to}).session(session);
//     if(!fromAcc || !toAcc){
//         await session.abortTransaction();
//         console.log("invalid");
//         return;
//     }
//     else if(account.balance<amount){
//         await session.abortTransaction();
//         console.log("Insufficient");
//         return;
//     }
//     else{

//         //Logic after doing relevant checks
//         await account.updateOne({userId:from},{
//             $inc:{balance : -amount}
//         }).session(session);
    
//         await account.updateOne({userId:to},{
//             $inc:{balance: amount}
//         }).session(session);

//         await session.commitTransaction();
//         console.log("transaction successful");
//         return;

//     }
// }

// transfer({
//     userId: "65b26fecd5dea75bdd8ea4b8",
//     body: {
//         "to": "65b26f9ed5dea75bdd8ea4b3",
//         "amount": "100"
//     }
// })
// transfer({
//     userId: "65b26fecd5dea75bdd8ea4b8",
//     body: {
//         "to": "65b26f9ed5dea75bdd8ea4b3",
//         "amount": "100"
//     }
// })

// Akshat token--> "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWIyNmZlY2Q1ZGVhNzViZGQ4ZWE0YjgiLCJpYXQiOjE3MDYxOTI4NzZ9.r_DEHGU3PLjF1i7YlhCaibuxidXZSbyIKOZU0VJNGho"
// Misty token--> "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWIyNmY5ZWQ1ZGVhNzViZGQ4ZWE0YjMiLCJpYXQiOjE3MDYxOTI3OTl9.eYnB4iaR7TDPUFdZy35X1wuYbiwEscdZnPg6RuojrOU"

module.exports={
    accountRouter: router
}