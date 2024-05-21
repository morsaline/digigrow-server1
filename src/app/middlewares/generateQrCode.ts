// Function to generate QR code
import { Request, Response, NextFunction } from 'express';
import qr from 'qrcode';
import fs from 'fs';
import path from 'path';
import config from '../config';

function generateQRCode(
  url: string,
  storeId: string,
  outletId: string,
  tableNumber: string,
  filePath: string,
): void {
  const fullUrl = `${url}/${storeId}/${outletId}/${tableNumber}`;
  qr.toFile(filePath, fullUrl, function (err) {
    if (err) throw err;
    console.log('QR code generated successfully');
  });
}

// Middleware to generate QR code
const qrCode = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { storeId, outletId } = req.params;
    const { tableNumber } = req.body;
    const folderName = 'qr_code'; // Folder name
    const fileName = `${outletId}_${tableNumber}_${Date.now()}_qrcode.png`;
    // eslint-disable-next-line no-undef
    const folderPath = path.join(
      // eslint-disable-next-line no-undef
      __dirname as string,
      '..',
      '..',
      '..',
      folderName,
    ); // Get full path to the folder

    // Check if the folder exists, if not, create it
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }

    // Generate and save the QR code
    const filePath = path.join(folderPath, fileName);
    generateQRCode(
      config?.client_url as string,
      storeId,
      outletId,
      tableNumber,
      filePath,
    );

    // Set the file path to the response locals for further usage
    res.locals.qrCodeFilePath = `${config.base_url}/qr_code/${fileName}`;
    next();
  } catch (error) {
    next(error);
  }
};

export default qrCode;
