import emailjs from '@emailjs/browser';
import { useEffect } from 'react';
export const useContact = () => {

  useEffect(()=>emailjs.init(import.meta.env.VITE_YOUR_PUBLIC_KEY),[])
  const sendMail = async(data,setLoading,setFormData) => {
    try {
      await emailjs.send(import.meta.env.VITE_YOUR_SERVICE_ID, import.meta.env.VITE_YOUR_TEMPLATE_ID, {
       to_name:"Hassane BENCHAREF",
       subject:data.subject,
       desc:data.desc,
       title:data.title,
       email:data.email
      });
      alert("email successfully sent check inbox");
      setFormData({
        email:"",
        desc:"",
        title:"",
        subject:""
      })
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  };
return [sendMail]
  
}
