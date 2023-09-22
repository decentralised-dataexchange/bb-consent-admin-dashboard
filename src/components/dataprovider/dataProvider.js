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
    userrecords: [
        { id: 0, subscriberID: 'e8b045f4-5401-4722-a447-3a4d6031a492', dataAgreement: 'Market and Campaign', lawfulBasis: 'Consent', agreementEvent: 'Opt-in', timestamp:'2023-08-26T18:52:33z'},
        { id: 1, subscriberID: 'e9b045f4-5401-4722-a447-3a4d6031a492', dataAgreement: 'Campaign', lawfulBasis: 'Consent', agreementEvent: 'Opt-in', timestamp:'2023-08-26T18:52:33z'},
        { id: 2, subscriberID: 'e9b045f4-5401-4722-a447-3a4d6031a492', dataAgreement: 'Marketing', lawfulBasis: 'Consent', agreementEvent: 'Opt-in', timestamp:'2023-08-26T18:52:33z'},
        { id: 3, subscriberID: 'e9b045f4-5401-4722-a447-3a4d6031a492', dataAgreement: 'Market and Campaign', lawfulBasis: 'Consent', agreementEvent: 'Opt-in', timestamp:'2023-08-26T18:52:33z'},
        { id: 4, subscriberID: 'e9b045f4-5401-4722-a447-3a4d6031a492', dataAgreement: 'Market and Campaign', lawfulBasis: 'Consent', agreementEvent: 'Opt-in', timestamp:'2023-08-26T18:52:33z'},
    ],
    viewlogs: [
        { id: 0, action: 'admin@retail.com logged in', category: 'Security', timestamp: '2023-09-22 05:26:58 +0000 UTC'},
        { id: 1, action: 'admin@retail.com logged in', category: 'Security', timestamp: '2023-09-22 05:26:58 +0000 UTC'},
        { id: 2, action: 'admin@retail.com logged in', category: 'Security', timestamp: '2023-09-22 05:26:58 +0000 UTC'},
        { id: 3, action: 'admin@retail.com logged in', category: 'Security', timestamp: '2023-09-22 05:26:58 +0000 UTC'},
        { id: 4, action: 'admin@retail.com logged in', category: 'Security', timestamp: '2023-09-22 05:26:58 +0000 UTC'},
    ],
})