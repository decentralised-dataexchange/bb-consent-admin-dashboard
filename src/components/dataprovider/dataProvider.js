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
    comments: [
        { id: 0, post_id: 0, author: 'John Doe', body: 'Sensational!' },
        { id: 1, post_id: 0, author: 'Jane Doe', body: 'I agree' },
    ],
})