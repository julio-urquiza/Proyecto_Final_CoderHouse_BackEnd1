import nodemailer from 'nodemailer';
import 'dotenv/config'

// const testAccount = await nodemailer.createTestAccount();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: process.env.GMAIL_PORT,
    auth: {
        user: process.env.GMAIL_MAIL,
        pass: process.env.GMAIL_PASS
    }
})

const mandarCorreo = async (email, subject, text ) => {
    try {
        const info = await transporter.sendMail({
                from: process.env.GMAIL_MAIL, 
                to: email,
                subject: subject,
                text: text
            })
        return {
        id: info.messageId, 
        de: info.envelope.from, 
        para: info.envelope.to, 
        accepted: info.accepted,
        rejected: info.rejected,
        response: info.response
        }
    } catch (error) {
        throw error
    }
}

export default mandarCorreo