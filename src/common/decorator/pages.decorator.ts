import { createParamDecorator } from '@nestjs/common';
import { Request } from 'express';
import { SelectQueryBuilder } from 'typeorm';

function whereString(str: string, alias: string) {
  let whereString = '';
  if (str) {
    try {
      const whereArr = JSON.parse(`[${str}]`);
      whereString = whereArr
        .map(item => {
          let str = '';
          switch (item.type) {
            case 'eq':
              str = `${alias}.${item.key}="${item.value}"`;
              break;
            case 'like':
              str = `${alias}.${item.key} like "%${item.value}%"`;
              break;
            default:
              str = `${alias}.${item.key}="${item.value}"`;
              break;
          }
          return str;
        })
        .join(' and ');
    } catch (error) {
      console.log(error);
      whereString = '';
    }
  }
  return whereString;
}

// 排序
function order(sort_by, desc) {
  let order: any = {};
  const orderVal = Number(desc) === 1 ? 'DESC' : 'ASC';
  if (sort_by) {
    order[sort_by] = orderVal;
  } else {
    order = { sort: 'DESC', create_time: 'DESC' };
  }
  return order;
}

function paging({ sort_by, desc = 1, page = 0, size = 10, where = '' }) {
  let _order: any = order(sort_by, desc);
  return async function(db: SelectQueryBuilder<any>) {
    let whereStr = whereString(where, db.alias);
    let res = await db
      .orderBy(_order)
      .skip(page * size)
      .take(size)
      .where(whereStr)
      .getManyAndCount();
    return {
      count: res[1],
      data: res[0],
    };
  };
}

export const Pages = createParamDecorator((data: any, req: Request) => {
  return paging(req.query);
});
