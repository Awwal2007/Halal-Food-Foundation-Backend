const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Trustee = require('./Models/trustee');
dotenv.config();

const trustees = [
    {
        name: "Dr Abdul Matin Khan",
        image: "image/drMartin1.webp",
        bio: "Having acquired the highest professional qualifications in Finance, Accounting and Administration in the UK as Chartered Management Accountant and Chartered Company Secretary and Administrator, Dr Khan has worked at senior management positions in Asia, Africa and Europe. Dr Khan has been involved with the HFA since its inception as one of the founding members of the BOT.",
        position: "Founding Member",
        order: 1
    },
    {
        name: "Dr Ghayasuddin Siddiqui",
        image: "image/drSiddque1.webp",
        bio: "Dr Ghayasuddin Siddiqui, a PhD in Chemistry is a well-known activist, campaigner, writer and expert on Muslim political thought. Dr Siddiqui has promoted dialogue and engagement across all barriers: religious, social, cultural and political; and was the founding chairman of the Halal Food Authority.",
        position: "Founding Chairman",
        order: 2
    },
    {
        name: "Mr Ehsan Choudhry",
        image: "image/mrChoudary.webp",
        bio: "Ehsan Choudhry is a graduate in Urdu, a General Secretary of Pakistan Welfare Association Hounslow, a research scholar and a world famous poet and author of seven books. Topping all of that with a heart of gold, Ehsan is also a pioneer volunteer of HFA since 1995 , the owner of an established business and a responsible journalist in the UK.",
        position: "Member",
        order: 3
    },
    {
        name: "Mr Ahmed Latif",
        image: "image/mrLatif.webp",
        bio: "Mr Ahmed Latif is presently CEO of A & M International Limited, which is a metal trading company and part of AMIDT Group of Dubai. Mr Latif Graduated in Commerce in 1963 from Karachi University and secured First Class First Position and was also awarded Gold Medal for his academic achievements. Mr Latif is also a member of Lions Club and spends great deal of his time in charitable work.",
        position: "Member",
        order: 4
    }
];

async function seed() {
    try {
        await mongoose.connect(process.env.Mongo_Uri);
        console.log("Connected to MongoDB for seeding...");
        
        for (const t of trustees) {
            const exists = await Trustee.findOne({ name: t.name });
            if (!exists) {
                await Trustee.create(t);
                console.log(`Added: ${t.name}`);
            } else {
                console.log(`Skipped (already exists): ${t.name}`);
            }
        }
        
        console.log("Seeding completed!");
        process.exit();
    } catch (error) {
        console.error("Seeding failed:", error);
        process.exit(1);
    }
}

seed();
