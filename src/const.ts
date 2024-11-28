export const BACKEND_API = 'https://api.pogb2b.ru/api'
// export const APP_ID = 1
// export const TEST_DOMAIN = 't-bank'
export const TEST_DOMAIN = 'shkulev'
// export const TEST_DOMAIN = 'vitacore'

export enum AppRoute {
  Root = '/',
  Welcome = '/welcome',
  Profile = '/profile',
  Questions = '/questions',
  Start = '/start',
  Questionnaire = '/questionnaire',
  Finish = '/finish',
  NotFound = '*'
}

/*

https://shkulev.scoring.pogovorim.online/
https://vitacore.scoring.pogovorim.online/



{
  "success": true,
  "data": {
      "id": 4,
      "uniq_id": "77754c72-a089-bc4b-cbdd-c671c13719c7",
      "domain": "shkulev",
      "title": null,
      "config": {
          "logo": null,
          "acc_color_1": null,
          "acc_color_2": null,
          "seo_title": null,
          "seo_description": null,
          "session_fields_require": "yes"
      },
      "apps": [
          {
              "id": 3,
              "title": "Опросник"
          }
      ],
      "departments": [
          {
              "id": 4,
              "title": "Отдел 1"
          },
          {
              "id": 5,
              "title": "Отдел 2"
          },
          {
              "id": 6,
              "title": "Отдел 3"
          },
          {
              "id": 7,
              "title": "Отдел 4"
          },
          {
              "id": 8,
              "title": "Отдел 5"
          }
      ]
  },
  "message": false
}


vitacore
{
    "success": true,
    "data": {
        "id": 3,
        "uniq_id": "b4781389-0d26-40e3-a134-7069f0e2e9d9",
        "domain": "vitacore",
        "title": null,
        "config": {
            "logo": null,
            "acc_color_1": null,
            "acc_color_2": null,
            "seo_title": null,
            "seo_description": null,
            "session_fields_require": "yes"
        },
        "apps": [
            {
                "id": 2,
                "title": "Опросник"
            }
        ],
        "departments": [
            {
                "id": 1,
                "title": "Программисты"
            },
            {
                "id": 2,
                "title": "Техническая поддержка"
            },
            {
                "id": 3,
                "title": "Администрация"
            }
        ]
    },
    "message": false
}


t-bank
{
    "success": true,
    "data": {
        "id": 1,
        "uniq_id": "8e9e3404-a88c-40e5-8157-c52358bcbdbc",
        "domain": "t-bank",
        "title": null,
        "config": {
            "logo": null,
            "acc_color_1": null,
            "acc_color_2": null,
            "seo_title": null,
            "seo_description": null,
            "session_fields_require": "yes"
        },
        "apps": [
            {
                "id": 1,
                "title": "Опросник"
            }
        ],
        "departments": []
    },
    "message": false
}

*/
