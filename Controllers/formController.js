const Form = require('../Models/form');
const { Resend } = require('resend');

// Make sure to add RESEND_API_KEY to your .env file
const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_key');

const submitForm = async (req, res, next) => {
    try {
        const { fullName, emailAddress, phoneNumber, businessName, serviceInterestedIn, message } = req.body;

        if (!fullName || !emailAddress || !phoneNumber || !serviceInterestedIn || !message) {
            return res.status(400).json({ error: "Please provide all required fields." });
        }

        const newForm = await Form.create({
            fullName,
            emailAddress,
            phoneNumber,
            businessName,
            serviceInterestedIn,
            message
        });

        const emailHtml = `
            <h2>New Form Submission</h2>
            <p><strong>Full Name:</strong> ${fullName}</p>
            <p><strong>Email Address:</strong> ${emailAddress}</p>
            <p><strong>Phone Number:</strong> ${phoneNumber}</p>
            <p><strong>Business Name:</strong> ${businessName || 'N/A'}</p>
            <p><strong>Service Interested In:</strong> ${serviceInterestedIn}</p>
            <p><strong>Message:</strong><br/>${message}</p>
        `;

        // It is recommended to verify a custom domain in Resend and replace onboarding@resend.dev
        await resend.emails.send({
            from: 'halalfoodfoundation.co.uk <theyoungpioneers.com>', 
            to: ['info@halalfoodfoundation.co.uk', 'info@halalfoodauthority.co.uk'],
            subject: 'New Website Form Submission',
            html: emailHtml,
            reply_to: emailAddress
        });

        return res.status(201).json({ message: "Form submitted successfully.", data: newForm });
    } catch (error) {
        next(error);
    }
};

module.exports = { submitForm };


//wat does the function defination means?
//The function definition `const submitForm = async (req, res, next) => { ... }` is an asynchronous function that handles the submission of a form.
