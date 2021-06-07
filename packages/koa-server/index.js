const path = require('path')
const Koa = require('koa');
const Router = require('@koa/router');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const serve = require('koa-static');

const app = new Koa();
const router = new Router();

let access = ''
const { DIST } = process.env;

if (DIST === 'true') {
    app.use(serve(path.join(__dirname, '../../dist')));
}

const waitTime = (time = 100) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, time);
    });
};

router.get('/api', (ctx) => {
    ctx.body = 'Hello World';
});

router.post('/api/login/account', async (ctx) => {
    console.log(ctx.request.body)
    const { password, username, type } = ctx.request.body;
    await waitTime(2000);
    if (password === 'ant.design' && username === 'admin') {
        ctx.body = ({
            status: 'ok',
            type,
            currentAuthority: 'admin',
        });
        access = 'admin';
        return;
    }
    if (password === 'ant.design' && username === 'user') {
        ctx.body = ({
            status: 'ok',
            type,
            currentAuthority: 'user',
        });
        access = 'user';
        return;
    }
    if (type === 'mobile') {
        ctx.body = ({
            status: 'ok',
            type,
            currentAuthority: 'admin',
        });
        access = 'admin';
        return;
    }

    ctx.body = ({
        status: 'error',
        type,
        currentAuthority: 'guest',
    });
    access = 'guest';
});

const getAccess = () => {
    return access;
};

router.get('/api/currentUser', (ctx) => {
    if (!getAccess()) {
        ctx.status = 401
        ctx.body = ({
            data: {
                isLogin: false,
            },
            errorCode: '401',
            errorMessage: '请先登录！',
            success: true,
        });
        return;
    }
    ctx.body = ({
        name: 'Serati Ma',
        avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
        userid: '00000001',
        email: 'antdesign@alipay.com',
        signature: '海纳百川，有容乃大',
        title: '交互专家',
        group: '蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED',
        tags: [
            {
                key: '0',
                label: '很有想法的',
            },
            {
                key: '1',
                label: '专注设计',
            },
            {
                key: '2',
                label: '辣~',
            },
            {
                key: '3',
                label: '大长腿',
            },
            {
                key: '4',
                label: '川妹子',
            },
            {
                key: '5',
                label: '海纳百川',
            },
        ],
        notifyCount: 12,
        unreadCount: 11,
        country: 'China',
        access: getAccess(),
        geographic: {
            province: {
                label: '浙江省',
                key: '330000',
            },
            city: {
                label: '杭州市',
                key: '330100',
            },
        },
        address: '西湖区工专路 77 号',
        phone: '0752-268888888',
    });
})

router.post('/api/login/outLogin', (ctx) => {
    access = ''
    ctx.body = ({ data: {}, success: true })
})

app
    .use(cors())
    .use(bodyParser())
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(3000);