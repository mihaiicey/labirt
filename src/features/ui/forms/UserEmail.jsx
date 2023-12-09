import React, { useState } from "react";
import { toast } from "react-toastify";
import { toastStandard } from "@/lib/cofigs";
import { supabase } from "@/supabase";
export default function UserEmailProfile({ email }) {
  const [newEmail, setNewEmail] = useState("");
  const [isEditable, setIsEditable] = useState(false);
  const [message, setMessage] = useState("");

  const handleEmailChange = (e) => {
    setNewEmail(e.target.value);
    setMessage("");
  };

  const handleUpdateClick = async () => {
    if (newEmail === "") {
      setMessage("Introduceți un email nou.");
    } else if (newEmail === email) {
      setMessage("Noul email este identic cu cel vechi.");
    } else {
      const { data, error } = await supabase.auth.updateUser({
        email: newEmail,
      });

      if (error) {
        toast.error(error.message, {
          ...toastStandard,
        });
      } else if (data) {
        console.log(data);
        toast.success(`Te rog verifica adresa de email: ${newEmail}`, {
          ...toastStandard,
        });
        setMessage("");
        setNewEmail("")
        setIsEditable(false);
      }
    }
  };

  return (
    <div>
      <label htmlFor="email">Email</label>
      <input
        value={isEditable ? newEmail : email}
        onChange={handleEmailChange}
        type="email"
        placeholder="Email nou"
        disabled={!isEditable}
        className="mb-3"
      />
      {message && <p className="text-sm text-red-600 pb-3">{message}</p>}

      <span
        onClick={() => setIsEditable(!isEditable)}
        className="cursor-pointer text-sm underline"
      >
        {isEditable ? "Anulează" : "Schimbă Emailul"}
      </span>
      {isEditable && (
        <button
          onClick={handleUpdateClick}
          className="ml-3 border border-secondary px-1 py-0.5 rounded-md "
        >
          Actualizează
        </button>
      )}
    </div>
  );
}
