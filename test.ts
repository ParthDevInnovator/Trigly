import { createAutomation, deleteAutomationQuery } from './src/actions/automations/queries'
import { v4 } from 'uuid'

async function tryIt() {
    try {
        const testId = v4()
        console.log("Testing with testId", testId)
        // I need a random or existing clerkId.
        // Let's first query a user.
        const { client } = await import('./src/lib/prisma')
        const users = await client.user.findMany()
        if (users.length === 0) {
            console.log("No users in db")
            return
        }
        const clerkId = users[0].clerkId
        console.log("Using clerkId", clerkId)

        await createAutomation(clerkId, testId)
        console.log("SUCCESS")
        await deleteAutomationQuery(testId)
    } catch (e) {
        console.error("FAIL", e)
    }
}
tryIt()
