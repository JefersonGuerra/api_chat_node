-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "add_contact" (
    "id" SERIAL NOT NULL,
    "id_user_sender" INTEGER NOT NULL,
    "id_user_recipient" INTEGER NOT NULL,
    "status" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "add_contact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contact_list" (
    "id" SERIAL NOT NULL,
    "id_user" INTEGER NOT NULL,
    "id_user_contact" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "contact_list_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "message" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "id_user_sender" INTEGER NOT NULL,
    "id_user_recipient" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "message_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "add_contact_id_user_sender_key" ON "add_contact"("id_user_sender");

-- CreateIndex
CREATE UNIQUE INDEX "add_contact_id_user_recipient_key" ON "add_contact"("id_user_recipient");

-- CreateIndex
CREATE UNIQUE INDEX "contact_list_id_user_key" ON "contact_list"("id_user");

-- CreateIndex
CREATE UNIQUE INDEX "contact_list_id_user_contact_key" ON "contact_list"("id_user_contact");

-- CreateIndex
CREATE UNIQUE INDEX "message_id_user_sender_key" ON "message"("id_user_sender");

-- CreateIndex
CREATE UNIQUE INDEX "message_id_user_recipient_key" ON "message"("id_user_recipient");

-- AddForeignKey
ALTER TABLE "contact_list" ADD CONSTRAINT "contact_list_id_user_contact_fkey" FOREIGN KEY ("id_user_contact") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
