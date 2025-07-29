const { initializeDB } = require("./db.connect");
// const fs = require("fs");
const Meet = require("./meet.model");


const express = require("express");
const cors = require("cors");

const app = express()
app.use(cors());

const corsOptions = {
    origin: "*",
    credentials: true
}


initializeDB();

// const jsonData = fs.readFileSync("meet.json", "utf-8");
// console.log(jsonData)
// const meetsData = JSON.parse(jsonData);
// // console.log(meetsData)

// function seedData(){
//     try{
//         for(const meetData of meetsData){
//             const newMeet = new Meet({
//                 eventTitle: meetData.title,
//                 eventHost: meetData.host,
//                 eventDate: meetData.date,
//                 eventDay: meetData.day,
//                 eventBeginingTime: meetData.beginingTime,
//                 eventEndingTime: meetData.endingTime,
//                 eventMode: meetData.mode,
//                 eventAddress: meetData.address,
//                 eventCity: meetData.city,
//                 eventDetail: meetData.detail,
//                 eventDressCode: meetData.dressCode,
//                 eventRestriction: meetData.restriction,
//                 eventWebsite: meetData.website,
//                 eventPrice:  meetData.price,
//                 eventImages: meetData.images
//             });

//             // console.log(newMeet.eventTitle)
//             newMeet.save();
//         }

//     } catch(error){
//         console.log("Error in seeding the data", error);
//     }
// }

// seedData();

// const newMeet =  {
//         eventTitle: "Retail Marketing Analytics Workshop",
//         eventHost: "Sunita Rao",
//         eventDate: "20th August 2025",
//         eventDay:"Wednesday",
//         eventBeginingTime: "9AM",
//         eventEndingTime: "12PM",
//         eventMode: "Offline",
//         eventAddress: "Hotel Grand Vigo, Mumbai, India",
//         eventCity: "Mumbai",
//         eventDetail: "Breakfast networking followed by an analytics-focused master class aimed at retail & FMCG marketers; panel plus hands on analytics demos.",
//         eventDressCode:"Formal/business",
//         eventRestriction: "Open to marketing professionals only; prior registration required",
//         eventPrice: "₹1,200"
//     }

const newMeet =  {
        eventTitle: "Performance Marketing Lab",
        eventHost: "Priya Menon",
        eventDate:"12th August 2025",
        eventDay:"Tuesday",
        eventBeginingTime: "2PM",
        eventEndingTime: "5PM",
        eventMode: "Offline",
        eventAddress: "Co-Working Café, Bengaluru, India",
        eventCity: "Bengaluru",
        eventDetail: " Interactive lab session around performance marketing tactics, influencer campaigns and SEO case studies rooted in Indian regional markets.",
        eventDressCode:"Smart casual",
        eventRestriction: "₹500 entry; refreshments included",
        eventPrice: "₹500",
        eventImages: "./images/2nd.jpg"
    }

    async function createMeet(newMeet){
        try{
            const meet = new Meet(newMeet)
            const saveMeet = await meet.save()
            console.log("New Movie Data: ", saveMeet)

        } catch(error){
            throw error
        }
    }
    // createMeet(newMeet)

    // const newMeet2 = {
    //     eventTitle: "AI Driven Campaign Workshop",
    //     eventHost: "Callen Dogh",
    //     eventDate:"18th August 2025",
    //     eventDay:"Monday",
    //     eventBeginingTime: " 3:00PM",
    //     eventEndingTime: "5:00PM",
    //     eventMode: "Online",
    //     eventDetail: "Interactive hands on session where participants follow along with an AI powered campaign template. Includes present materials, breakout room exercises for live audience work, and group debrief. Limited to ensure quality, emphasizes workshop-style delivery.",
    //     eventRestriction: " Registration required; ₹500 for workbook and materials",
    //     eventWebsite: "placeholdermeet.com",
    //     eventPrice: "Free"
    // }

    // const newMeet2 = 
    // {
    //     eventTitle: "Key Marketing Org Design Trends",
    //     eventHost: "Gartner (Marketing & Communications)",
    //     eventDate: "14th August 2025",
    //     eventDay:"Thursday",
    //     eventBeginingTime: " 4:00PM",
    //     eventEndingTime: "6:00PM",
    //     eventMode: "Online",
    //     eventDetail: "Complimentary Gartner webinar exploring marketing organizational design trends to help accelerate the CMO's strategic agenda",
    //     eventRestriction: "online registration required",
    //     eventWebsite: "placeholderlink.com",
    //     eventPrice: "Free"
    // }

    // async function createMeets(newMeet2){
    //     try{
    //         const meet2 = new Meet(newMeet2)
    //         const saveMeet2 = await meet2.save()
    //         console.log("New Movie Data: ", saveMeet2)

    //     } catch(error){
    //         throw error
    //     }
    // }
    // createMeets(newMeet2)

    async function deleteMeetById(meetId){
        console.log( "meet ID:", meetId)
        try{
            const delMeet = await Meet.findByIdAndDelete(meetId)
            console.log("data is deleted; ", delMeet)

        } catch(error){
            console.log("Error in deleting", error)
        }
    }
// deleteMeetById("6888b6f4cafe384fa21055e0")


//get meet by title;
async function readMeetByTitle(meetTitle){
    try{
        const meet = await Meet.findOne({eventTitle: meetTitle})
        // console.log("meet", meet)
        return meet
    } catch(error){
        console.log(error)
    }
}
// readMeetByTitle("Performance Marketing Lab")

app.get("/meets/:title", async (req, res) => {
    try{
        const meet = await readMeetByTitle(req.params.title)
        console.log(req)
        console.log(meet)
        if(meet){
            res.json(meet)
        } else{
            res.status(404).json({error: 'Meet not found.'})
        }

    } catch(error){
        res.status(500).json({error: "Failed to fetch meet."})

    }
})


//get all meet from the db.

async function readAllMeet(){
    try{
    const allMeets = await Meet.find()
    console.log("ALL:", allMeets)
    return allMeets
    }
    catch(error){
        throw error
    }
}
// readAllMeet()

app.get("/meets", async(req, res) => {
    try{
        const allMeets = await readAllMeet()
        if(allMeets){
            res.json(allMeets)
        } else{
            res.status(404).json({error: "Meet not found."})
        }
    } 
    catch(error){
        res.status(500).json({error: "Failed to fetch meet."})
    }
})

// get meet by id.
async function readMeetById(meetId){
    try{
        const meetById = await Meet.findById(meetId)
        // console.log(meetById);
        return meetById
    } catch(error){
        throw error
    }
}
// readMeetById("68864acaf0e90080098c9a30")

app.get("/meets/getMeet/:meetId", async(req, res) => {
    try{
        const getMeetId = await readMeetById(req.params.meetId)
        console.log(getMeetId)

        if(getMeetId){
            res.json(getMeetId)
        } else{
            res.status(404).json({error: "Meet not found."})
        }
    } catch(error){
        res.status(500).json({error: "Failed to fetch meet."})

    }
})




//get meet by mode.
async function meetByMode(mode){
    try{
        const meetByMode = await Meet.find({eventMode: mode})
        // console.log(meetByMode)
        return meetByMode
    } catch(error){
        console.log(error)
    }
}
// meetByMode("Online")

app.get("/meets/direct/:mode", async(req, res) => {
    try{
        const meetMode = await meetByMode(req.params.mode)
        if(meetMode.length != 0){
            res.json(meetMode)
        } else{
            res.status(400).json({error: "Meet not found."})
        }
    }
    catch(error){
        res.status(500).json({error: "Failed to fetch meet."})
    }
})

//get meet by prize free.
async function meetByFreePrice(meetPrice){
    try{
    const meetByPrice = await Meet.find({eventPrice: meetPrice})
     console.log(meetByPrice)
    return meetByPrice
    }
    catch(error){
        throw error
    }
}
// meetByFreePrice("Free")

app.get("/meets/price/:meetPrice", async(req, res) => {
    try{
        const meetsPrice = await meetByFreePrice(req.params.meetPrice)
        console.log(req)
        console.log(meetsPrice)
        if(meetsPrice){
           res.json(meetsPrice)
        } else{
            res.status(404).json({error: "Meet not found."})
        }

    } catch(error){
        res.status(500).json({error: "Failed to fetch meet."})

    }
})


const PORT = 2000
app.listen(PORT, () => {
    console.log(`Server is running on the port ${PORT}`)
})




