const express = require('express');
const nodemailer = require('nodemailer');

const router = express.Router();

const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
        }
});

router.post('/', async (req, res) => {
        const { name, email, app } = req.body;
        try {
                await transporter.sendMail({
                        from: process.env.EMAIL_USER,
                        to: email,
                        subject: "Application Received",
                        html: `
        <h2>Hello ${name}</h2>
        <p>Your application for <b>${app}</b> has been received. You will shortly receive the further steps for the completion of the process.</p>
      `
                });
                res.status(200).json({
                        success: true,
                        message: "Email sent"
                });
        } catch (err) {
                console.log(err);
                res.status(500).json({
                        success: false,
                        message: "Failed to send email"
                });
        }
});

module.exports = router;