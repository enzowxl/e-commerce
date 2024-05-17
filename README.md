# E-commerce

This is an e-commerce project for selling products online, with an integrated payment system, including authentication and RBAC authorization.

## Features

### Authentication

- [x] It should be able to authenticate using e-mail and password;
- [x] It should be able to create an account (e-mail, name and password);

### Products

- [x] It should be able to create a new product;
- [x] It should be able to update an product;
- [x] It should be able to delete an product;
- [x] It should be possible to obtain the products;

### Categories

- [x] It should be able to create a new category;
- [x] It should be able to update a category;
- [x] It should be possible to delete a category;
- [x] It should be possible to obtain the categories;

### Members

- [x] It should be able to create a new member;
- [x] It should be able to obtain the members;
- [x] It should be able to update a member role;
- [x] It should be possible to delete a member;

### Orders

- [x] It should be able to create an order;
- [x] It should be possible to obtain the orders;
- [x] It should be able to update a order;

### Cart

- [x] It should be able to add products to a cart;
- [x] It should be able to remove products from a cart;

## RBAC

Roles & permissions.

### Roles

- Administrator
- Member
- Anonymous

### Permissions table

|                    | Administrator | Member | Anonymous |
| ------------------ | ------------- | ------ | --------- |
| Access dashboard   | ✅            | ❌     | ❌        |
| ㅤ                 |               |        |           |
| Get product        | ✅            | ✅     | ✅        |
| Create product     | ✅            | ❌     | ❌        |
| Update product     | ✅            | ❌     | ❌        |
| Delete product     | ✅            | ❌     | ❌        |
| ㅤ                 |               |        |           |
| Get category       | ✅            | ✅     | ✅        |
| Create category    | ✅            | ❌     | ❌        |
| Update category    | ✅            | ❌     | ❌        |
| Delete category    | ✅            | ❌     | ❌        |
| ㅤ                 |               |        |           |
| Create member      | ✅            | ❌     | ❌        |
| Get member         | ✅            | ⚠️     | ❌        |
| Update member      | ✅            | ⚠️     | ❌        |
| Update member role | ✅            | ❌     | ❌        |
| Delete member      | ✅            | ❌     | ❌        |
| ㅤ                 |               |        |           |
| Create order       | ✅            | ✅     | ❌        |
| Finish order       | ✅            | ✅     | ❌        |
| ㅤ                 |               |        |           |
| Add item cart      | ✅            | ✅     | ✅        |
| Remove item cart   | ✅            | ✅     | ✅        |

> ✅ = allowed
> ❌ = not allowed
> ⚠️ = allowed w/ conditions

#### Conditions

- Only authors of their own account can update/get it
