import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

type Data = {
    unique: boolean;
    message: string;
};

let url =
    process.env.NEXT_PUBLIC_ENV === 'prod'
        ? process.env.JELO_API_LIVE
        : process.env.JELO_API_DEV

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if (req.method !== "GET") {
        return res.status(405).json({ unique: false, message: "Method not allowed" });
    }

    const { title, orgId } = req.query;

    console.log({ title, orgId })

    if (!title || typeof title !== "string") {
        return res.status(400).json({ unique: false, message: "Invalid title parameter" });
    }

    try {
        const existing = await axios.post(
            `${url}/assesement/check-title`,
            {
                title
            },
            { headers: { Authorization: `Bearer api_live_${orgId}` } }
        )

        console.log(existing.data.existing.existing)
        if (existing.data.existing.existing) {
            return res.status(200).json({ unique: false, message: "Title already exists" });
        }

        return res.status(200).json({ unique: true, message: "Title is available" });
    } catch (error) {
        console.error("[CheckTitleError]", error);
        return res.status(500).json({ unique: false, message: "Server error" });
    }
}
