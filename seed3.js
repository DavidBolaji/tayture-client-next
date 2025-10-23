
const { PrismaClient } = require('@prisma/client')
const axios = require('axios') // ✅ Import axios

// Use globalThis instead of global for better compatibility
const globalPrisma = globalThis

const db = globalPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
    globalPrisma.prisma = db
}

const BATCH_SIZE = 3;
let secret = process.env.JELO_SECRET;
let url =
    process.env.NEXT_PUBLIC_ENV === 'prod'
        ? process.env.JELO_API_LIVE
        : process.env.JELO_API_DEV

// ✅ Append schoolId to email safely
function appendSchoolIdToEmail(email, schoolId) {
    if (!email.includes('@')) {
        throw new Error('Invalid email format')
    }

    const [name, domain] = email.split('@')
    return `${name}_${schoolId}@${domain}`
}




// ✅ Seed Database
const seedDb = async () => {
    try {
        const schools = await db.school.findMany({
            select: {
                sch_id: true,
                sch_name: true,
                user: { select: { id: true, email: true, phone: true, fname: true, lname: true } },
            },
        })

        console.log(`Total Schools: ${schools.length}`)
        console.log(schools)


        for (let i = 0; i < schools.length; i += BATCH_SIZE) {
            const batch = schools.slice(i, i + BATCH_SIZE);

            await Promise.all(
                batch.map(async (school) => {
                    if (!school.user.email) return;

                    const email = appendSchoolIdToEmail(school.user.email, school.sch_id);

                    await axios.post(
                        `${url}/signup`,
                        {
                            email,
                            password: school.sch_id,
                            fname: school.user?.fname,
                            lname: school.user?.lname,
                            phone: `${school.user.phone}_${school.sch_id}`,
                            name: school.sch_name,
                            schId: school.sch_id,
                        },
                        { headers: { Authorization: `Bearer ${secret}` } }
                    );
                })
            );

            console.log(`Processed batch ${i / BATCH_SIZE + 1}`);
        }

    } catch (error) {
        console.error('Seeding Error:', error.message)
    }
}

seedDb()
    .then(() => console.log('Seeding Done'))
    .catch((err) => console.error('Seeding Failed:', err))

module.exports = db