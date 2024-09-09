export interface ITheme {
    [key: string]: IThemeItem
}

export interface IThemeItem {
    mainColor: string,
    token: {
        [key: string]: string | number | boolean
    } | undefined
}

export const THEME_LIST: ITheme = {
    'По умолчанию': {
        mainColor: '#1890ff',
        token: undefined
    },
    'Соц сеть ЭФКО': {
        mainColor: '#0f766e',
        token: {
            "borderRadius": 16,
            "colorPrimary": "#0f766e",
            "colorInfo": "#0f766e",
            "colorPrimaryBg": "#edf3f3"
        }
    },
    'ИСУИ': {
        mainColor: '#73a480',
        token: {
            "colorPrimary": "#73a480",
            "colorInfo": "#73a480",
            "colorTextBase": "#222222",
            "wireframe": true,
            "borderRadius": 0
        },
    },
    'QMoex': {
        mainColor: '#805dca',
        token: {
            "colorPrimary": "#805dca",
            "colorInfo": "#805dca",
            "colorTextBase": "#1f2937",
            "wireframe": false,
            "colorBgBase": "#ffffff",
            "borderRadius": 6
        }
    },
    "Digital solutions": {
        mainColor: '#edcb4a',
        token: {
            "colorPrimary": "#edcb4a",
            "colorInfo": "#edcb4a",
            "colorTextBase": "#131310",
            "wireframe": false,
            "colorBgBase": "#ffffff",
            "borderRadius": 6,
            "sizeStep": 4,
            "sizeUnit": 4
        }
    },
    "Темная мягкая": {
        mainColor: '#37393E',
        token: {
            "colorPrimary": "#73767C",
            "colorInfo": "#73767C",
            "colorTextBase": "#B9BBBE",
            "wireframe": false,
            "colorBgBase": "#37393E",
            "borderRadius": 6,
            "sizeStep": 4,
            "sizeUnit": 4,
        }
    },
    "Темная контрастная": {
        mainColor: '#1F1F1F',
        token: {
            "colorPrimary": "#73767C",
            "colorInfo": "#73767C",
            "colorTextBase": "#FFFFFF",
            "wireframe": false,
            "colorBgBase": "#1F1F1F",
            "borderRadius": 6,
            "sizeStep": 4,
            "sizeUnit": 4,
        }
    }
}
