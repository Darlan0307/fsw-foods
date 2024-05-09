import axios from "axios";
import { toast } from "sonner";

export async function RegisterEmail(email: string) {
  try {
    await axios.post("https://food-api-email.onrender.com/email", {
      email,
    });

    return true;
  } catch (error: any) {
    toast.error(error.response.data.message);
    return false;
  }
}
