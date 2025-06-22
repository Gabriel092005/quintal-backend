-- CreateTable
CREATE TABLE "MessagesOff" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "data" TEXT,
    "send_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "senderId" INTEGER NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "receiverId" INTEGER NOT NULL,

    CONSTRAINT "MessagesOff_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MessagesOff" ADD CONSTRAINT "MessagesOff_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MessagesOff" ADD CONSTRAINT "MessagesOff_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
