The certificates are generated by following guidelines

https://fabianlee.org/2018/02/17/ubuntu-creating-a-trusted-ca-and-san-certificate-using-openssl-on-ubuntu/

Nginx needs chained certs and key separately

mv bb-consent.dev.key.pem bb-consent.dev.key
cat $prefix.crt ca.pem  > bb-consent.dev.crt

After that we need to add ca.pem to the browser

