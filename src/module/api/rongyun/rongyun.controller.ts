import { Controller, HttpService, Get, Query, Post, Body } from '@nestjs/common';
import { createHeader, rongyunConfig } from '../../../utils/rongyun';
import { GetTokenDto } from './dto';
import { ApiUseTags } from '@nestjs/swagger';

function arrConverForm(k, arr) {
	let newData = ''
	if (typeof arr === 'object') {
		for (const key in arr) {
			newData += encodeURIComponent(k) + '=' + encodeURIComponent(arr[key]) + '&'
		}
	}
	return newData
}

@ApiUseTags('融云')
@Controller('rongyun')
export class RongyunController {
    constructor(private readonly httpService: HttpService) { }

    @Post('get_token')
    async getToken(@Body() body: GetTokenDto) {
        // console.log(body);
        const header = createHeader();
        let res = {}
        try {
            res = await this.httpService.post(`/user/getToken.json`, {
                ...body
            }, {
                headers: header,
                baseURL: rongyunConfig.url,
                transformRequest: [function (data) {
				
                    if (data !== null && typeof data === 'object') {
                        let newData = ''
                        for (let k in data) {
                            if (typeof data[k] === 'object') {
                                newData += arrConverForm(k, data[k])
                            }else {
                                newData += encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) + '&'
                            }
                        }
                        newData = newData.slice(0, -1)
                        return newData
                    }
                    return data
                }]
            }).toPromise()
            console.log(res);
        } catch (error) {
            console.log(error);
        }
        return { header, url: `${rongyunConfig.url}/user/getToken`, body };
    }
}
