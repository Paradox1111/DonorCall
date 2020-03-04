# Donor Call proposal

This application serves as a single location for information on donors and other financial contributors. It is intended to help stewards keep track of which donors they've called, when, and various other important data points.

# Models

### - Donor

    - steward (ForeignKey)
    - orgName
    - lastName
    - phone
    - email
    - paymentNum
    - yearTotal
    - lastGift
    - lastGiftDate
    - nextLastGift
    - nextLastGiftDate
    - comments
    - recentCallDate

### - Steward

    - donors (ForeignKeys)
    - name
    - pass

# Wireframes

- Backend
  https://miro.com/app/board/o9J_kvdwtHQ=/

  -Frontend
