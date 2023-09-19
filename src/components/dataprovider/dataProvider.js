import fakeDataProvider from 'ra-data-fakerest';

export const dataProvider = fakeDataProvider({
    dataagreement: [
        { id: 0, usagePurpose: 'User Registration', version: '1.0.0', dataExchange:"Data Using Service", status:"Saved", lawfulBasisOfProcessing: "Contractual"},
        { id: 1, usagePurpose: 'User Registration', version: '1.1.0', dataExchange:"Data Source", status:"Saved", lawfulBasisOfProcessing: "Contractual"},
        { id: 2, usagePurpose: 'User Registration', version: '1.0.2', dataExchange:"Data Using Service", status:"Saved", lawfulBasisOfProcessing: "Consent"},
        { id: 3, usagePurpose: 'User Registration', version: '1.0.0', dataExchange:"Data Using Service", status:"Saved", lawfulBasisOfProcessing: "Contractual"},
        { id: 4, usagePurpose: 'User Registration', version: '1.1.0', dataExchange:"Data Source", status:"Saved", lawfulBasisOfProcessing: "Contractual"},
        { id: 5, usagePurpose: 'User Registration', version: '1.0.2', dataExchange:"Data Using Service", status:"Saved", lawfulBasisOfProcessing: "Consent"},

    ],
    personaldata: [
        { id: 0, dataAttributeName: 'Aadhar name', description: 'Aadhar names', dataAgreement: 'Verify Aadhaar' },
        { id: 1, dataAttributeName: 'Aadhar name', description: 'Aadhar names', dataAgreement: 'Verify Aadhaar' },
        { id: 2, dataAttributeName: 'Aadhar name', description: 'Aadhar names', dataAgreement: 'Verify Aadhaar' },
        { id: 3, dataAttributeName: 'Aadhar name', description: 'Aadhar names', dataAgreement: 'Verify Aadhaar' },
        { id: 4, dataAttributeName: 'Aadhar name', description: 'Aadhar names', dataAgreement: 'Verify Aadhaar' },
    ],
})