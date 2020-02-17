export interface FnsCheckItem {
  quantity: number
  sum: number
  price: number
  name: string
}

export interface FnsCheck {
  items: FnsCheckItem[]
  nds10: number
  fiscalSign: number
  addressToCheckFiscalSign: string
  ecashTotalSum: number
  shiftNumber: number
  fiscalDocumentNumber: number
  kktRegId: string
  totalSum: number
  dateTime: string
  receiptCode: number,
  fiscalDriveNumber: string
  retailPlaceAddress: string
  user: string
  requestNumber: number
  senderAddress: string
  nds18: number
  cashTotalSum: number
  userInn: string
  operationType: number
  taxationType: number
  operator: string
  buyerAddress: string
  rawData: string
}

export interface FnsResponse {
  document: {
    receipt: FnsCheck
  }
}
