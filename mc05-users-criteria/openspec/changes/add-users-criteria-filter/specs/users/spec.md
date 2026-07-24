# users

## ADDED Requirements

### Requirement: User search with criteria and pagination
The users list SHALL support filtering, sorting and pagination through a
`UserCriteria` object resolved by the repository, so it scales beyond
client-side filtering.

#### Scenario: default criteria
- **GIVEN** no filters are provided
- **WHEN** `UserCriteria.default()` is built
- **THEN** there is no search text and no role filter
- **AND** results are ordered by `createdAt` descending
- **AND** the page is 1 with page size 10

#### Scenario: filter by text
- **GIVEN** users with name and email
- **WHEN** the criteria has searchText "ada"
- **THEN** only users whose name or email contains "ada" (case-insensitive) are returned

#### Scenario: filter by role
- **GIVEN** users with roles admin and member
- **WHEN** the criteria has role "admin"
- **THEN** only admin users are returned

#### Scenario: pagination beyond the first page
- **GIVEN** 12 users and a page size of 10
- **WHEN** page 2 is requested
- **THEN** the remaining 2 users are returned
- **AND** total is 12 and totalPages is 2

#### Scenario: no results
- **GIVEN** a searchText that matches nobody
- **WHEN** the search runs
- **THEN** total is 0 and totalPages is 0

### Requirement: Criteria validation
The `UserCriteria` factory SHALL reject out-of-range pagination values.

#### Scenario: invalid page
- **GIVEN** a page lower than 1
- **WHEN** the criteria is built
- **THEN** it fails with a validation error

#### Scenario: invalid page size
- **GIVEN** a pageSize outside 1..100
- **WHEN** the criteria is built
- **THEN** it fails with a validation error
