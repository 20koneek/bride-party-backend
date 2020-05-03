import { sequelize } from '../../database/sequelize'
import { Attachmentable, BaseModel, ENUMDataType, UUIDColumn, Paymentable, GroupIndex } from './BaseModel'
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
import { Attachment } from './Attachment'

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
    Attachment,
])

export {
    Attachmentable,
    BaseModel,
    UUIDColumn,
    ENUMDataType,
    Paymentable,
    GroupIndex,
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
    Attachment,
}
