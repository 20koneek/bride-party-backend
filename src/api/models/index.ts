import { sequelize } from '../../database/sequelize'
import { BaseModel, ENUMDataType, UUIDColumn, Paymentable } from './BaseModel'
import { Contest } from './Contest'
import { ContestCondition } from './ContestCondition'
import { ContestWedding } from './ContestWedding'
import { Feed } from './Feed'
import { Guest } from './Guest'
import { GuestCard } from './GuestCard'
import { CardInfo } from './CardInfo'
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
    CardInfo,
    Payment,
    Post,
    Wedding,
])

export {
    BaseModel,
    UUIDColumn,
    ENUMDataType,
    Paymentable,
    Contest,
    ContestCondition,
    ContestWedding,
    Feed,
    Guest,
    GuestCard,
    CardInfo,
    Payment,
    Post,
    Wedding,
}
