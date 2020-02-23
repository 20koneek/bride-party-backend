export namespace TheMapTypes {
    export namespace Init {
        export type Type = 'Pay' | 'Add'
        export type PaymentType = 'OneStep' | 'TwoStep'

        export interface Params {
            orderId?: string
            amount?: number
            // CustomParams	Дополнительные параметры платежа
            addCard?: boolean
            type: Type
            paymentType?: PaymentType
            // Action	Дополнительное действие с заблокированной суммой. «Unblock» - разблокировка	Доступно только для TwoStep	Нет
            recurrent?: boolean
            lifetime?: number
            // Goods	Список наименований товаров/услуг для отправки в ОФД (54-ФЗ)
            cardUId?: string
            userLogin?: string
            userPassword?: string
            // Split	Используется для разделение суммы произведенного списания на составные части для последующих расчетов с контрагентами	Строка, содержащая группы пар ключ-значение, где группы содержатся в фигурных скобках {}, пары ключ-значение разделены символом «,» (запятая). Ключ и значение разделены символом «:» (двоеточие). Строка обособляется прямоугольными скобками «[]». Параметры ключей и значений выдаются Продавцу с параметрами тестового/боевого доступа. Общая сумма всех составных частей должна соответствовать Amount	Нет
        }

        export interface Success {
            // Success	Флаг успешности операции	true/false
            // OrderId	Идентификатор платежа в системе Продавца	Соответсвует переданному в запросе
            // Amount	Заблокированная сумма. Передается, если «Success=true»	Соответсвует переданному в запросе
            // Type	pay/add	Соответсвует переданному в запросе
            // ErrCode	Описание ошибки. Передается пустой, если «Success=true»	см. коды ошибок
            // ErrMessage	Дополнительное описание ошибки. Передается пустой, если «Success=true»	Строка
            SessionGUID: string//	Уникальный идентификатор сессии	Строка
        }

        export interface Error {
        }

        export type Response = Success & Error
    }

    export namespace CreateUser {
        export interface Params {
            login: string
            password: string
        }

        export interface Success {
            Success: boolean
            UserId: number
            AlreadyCreated: boolean
            ErrCode: string
        }

        export interface Error {
            Success: string
            ErrCode: string
            ErrMessage: string
        }

        export type Response = Success & Error
    }

    export namespace CreatePayment {
        export interface Params {
            SessionGUID: string
        }

        export interface Success {
        }

        export interface Error {
            Success: string
            ErrCode: string
            ErrMessage: string
        }

        export type Response = Success & Error
    }
}
