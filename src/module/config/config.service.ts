import * as dotenv from "dotenv";
import * as fs from 'fs'
import * as Joi from 'joi'

export interface EnvConfig {
    [key: string]: string
}

export class ConfigService {

    private readonly envConfig: EnvConfig

    constructor(filePath?: string) {
        // 设置环境变量 防止出错
        process.env.NODE_ENV = process.env.NODE_ENV || 'development'

        // 设置文件配置路径
        filePath = filePath || `${__dirname}/../../config/${process.env.NODE_ENV}.env`

        const config = dotenv.parse(fs.readFileSync(filePath))
        this.envConfig = this.validateInput(config)
    }

    private validateInput(envConfig: EnvConfig): EnvConfig {
        const envVar: Joi.ObjectSchema = Joi.object({
            HOST: Joi.number().default(3000),
            DB_PORT: Joi.number().default(3306),
            DB_USERNAME: Joi.string().default('root'),
            DB_PASSWORD: Joi.any(),
            DB_DATABASE: Joi.string(),
            DB_HOST: Joi.strict(),
            DB_DURATION: Joi.number().default(3000),
            UPLOAD_DEST: Joi.string().default('/uploads'),
        })

        const { error, value: validatedEnvConfig } = Joi.validate(
            envConfig,
            envVar
        );


        if (error) {
            throw new Error(`config vaildation error : ${error.message}`)
        }
        return validatedEnvConfig
    }
    get dbPassword(): string {
        return this.envConfig.DB_PASSWORD
    }

    get dbDatabase(): string {
        return this.envConfig.DB_DATABASE
    }

    get dbUsername(): string {
        return this.envConfig.DB_USERNAME
    }

    get dbPort(): number {
        return Number(this.envConfig.DB_PORT)
    }

    get dbHost(): string {
        return this.envConfig.DB_HOST
    }

    get host(): string {
        return this.envConfig.HOST
    }

    get dbDuration(): number {
        return Number(this.envConfig.DB_DURATION)
    }

    get uploadDest(): string {
        return this.envConfig.UPLOAD_DEST
    }

    get(key: string) {
        return this.envConfig[key]
    }
}