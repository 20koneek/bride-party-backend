import { sequelize } from '../../database/sequelize'
import { BaseModel, UUIDColumn } from './BaseModel'
import { Contest } from './Contest'
import { ContestCondition } from './ContestCondition'
import { ContestWedding } from './ContestWedding'
import { Feed } from './Feed'
import { Guest } from './Guest'
import { GuestCard } from './GuestCard'
import { Payment } from './Payment'
import { Post } from './Post'
import { Wedding } from './Wedding'

sequelize.addModels([
    Contest,
    ContestCondition,
    ContestWedding,
    Feed,
    Guest,
    GuestCard,
    Payment,
    Post,
    Wedding,
])

export {
    BaseModel,
    UUIDColumn,
    Contest,
    ContestCondition,
    ContestWedding,
    Feed,
    Guest,
    GuestCard,
    Payment,
    Post,
    Wedding,
}
