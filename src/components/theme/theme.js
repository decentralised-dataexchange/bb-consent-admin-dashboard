import { defaultTheme } from 'react-admin';

export const theme = {
    ...defaultTheme,
    palette: {
      background: {
          default: "#FFFF",
      },
    },
    components: {
        ...defaultTheme.components,
        RaDatagrid: {
            styleOverrides: {
              root: {
                  backgroundColor: "#FFFF",
                  "& .RaDatagrid-headerCell": {
                    fontWeight:'bold',
                      backgroundColor: "#E5E4E4",
                      border: '1px solid #D7D6D6',

                  },
                  "& .RaDatagrid-rowCell	": {
                    border: '1px solid #D7D6D6',
                    },
              }
           }
        },
    }
};