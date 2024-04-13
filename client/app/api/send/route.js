import { EmailTemplate } from "../../_components/email-template";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  const body = await req.json();
  try {
    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: [body.email],
      subject: "Your Courses Are Ready for Download 🎓",
      react: EmailTemplate(),
    });

    return Response.json(data);
  } catch (error) {
    return Response.json({ error });
  }
}
