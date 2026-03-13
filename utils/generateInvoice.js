const PDFDocument = require("pdfkit")
const fs = require("fs")

const generateInvoice = (booking, car) => {

  const filePath = `invoice-${booking._id}.pdf`

  const doc = new PDFDocument()

  const stream = fs.createWriteStream(filePath)

  doc.pipe(stream)

  doc.fontSize(20).text("Car Rental Receipt", { align: "center" })

  doc.moveDown()

  doc.fontSize(12).text(`Booking ID: ${booking._id}`)
  doc.text(`Car: ${car.name}`)
  doc.text(`Start Date: ${booking.startDate.toDateString()}`)
  doc.text(`End Date: ${booking.endDate.toDateString()}`)
  doc.text(`Total Price: ${booking.totalPrice} PKR`)

  doc.moveDown()

  doc.text(
    "Note: Please bring this receipt when you collect or drop the car back from the showroom."
  )

  doc.end()

  return new Promise((resolve) => {
    stream.on("finish", () => {
      resolve(filePath)
    })
  })
}

module.exports = generateInvoice;