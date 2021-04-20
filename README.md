# money-manager

## Server endpoints

### Auth
| Endpoint  |Method|Description|
|-----------|------|-----------|
| /signup   | post | Sign up   |
| /login    | post | Log in    |
| /logout   | post | Log out   |
| /loggedin | get  | Logged in |

### Categories
| Endpoint                            | Method | Description            |
|-------------------------------------|--------|------------------------|
| /newCategory                        | post   | Create category        |
| /editCategory/:category_id          | put    | Edit category          |
| /getUserCategories/:user_id         | get    | Get user categories    |
| /getCategoriesByType/:category_type | get    | Get categories by type |

### Account Type
| Endpoint                            | Method | Description           |
|-------------------------------------|--------|-----------------------|
| /newAccountType                     | post   | Create account type   |
| /editAccountType/:account_type_id   | put    | Edit account type     |
| /getAllAccountTypes                 | get    | Get all account types |
| /deleteAccountType/:account_type_id | delete | Delete account type   |

### Account
| Endpoint                   | Method | Description           |
|----------------------------|--------|-----------------------|
| /newAccount                | post   | Create account        |
| /editAccount/:account_id   | put    | Edit account          |
| /getUserAccounts/:user_id  | get    | Get all user accounts |
| /deleteAccount/:account_id | delete | Delete account type   |

## Transactions
| Endpoint                         | Method | Description            |
|----------------------------------|--------|------------------------|
| /newTransaction                  | post   | Create new transaction |
| /editTransaction/:transaction_id | put    | Edit transaction       |
| /getUserTransactions/:user_id    | get    | Get user transactions  |
| /deleteAccount/:account_id       | delete | Delete transaction     |
