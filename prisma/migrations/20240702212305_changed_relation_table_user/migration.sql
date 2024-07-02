-- AddForeignKey
ALTER TABLE "add_contact" ADD CONSTRAINT "add_contact_id_user_sender_fkey" FOREIGN KEY ("id_user_sender") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
