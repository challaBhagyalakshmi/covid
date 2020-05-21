# Novel Coronavirus 2019 Cases

## Introduction:

    In this project we have to build a API's for the How many covid cases in daily in worldwide i.e number of deaths, number of recovered cases and number of confirmed cases using node.js,express and postgres.

## Dependencies:

    - postgres - For Database design
    - sequelize - To connect node to the database
    - express - The server for handling and routing HTTP request
    - Middlewares - Cors,Body-Parser and Error Handling
    - express-jwt - Middleware for validating JWTs authentication

## Requirements:

    - npm & node
    - git

## Project Overview

    -Db design
        * Models
            1.users(name(unique key),user_id primary key,pass,email(unique key),admin)
            2.countries(country_name(unique key),id serial(primary key))
            3.covid_infos(id(primary key) serial,confirm_cases int,recovered_cases,no_of_deaths,country_code(foreign key which is referenced to id in countries table))

    -GET Routes
            * /totalconfirmed cases -> It will give the response of top 10 countries of whose having highest number of cases
                Response body:
                 {
                    {
                       "country_name":"america",
                       "no_of_cases":6,78,000
                    },
                    {
                        "country_name":"italy",
                        "no_of_cases":50,678
                    }
                 }
            * /totaldeaths -> It will give the response of top 10 countries of whose having highest number of deaths
                    Response body:
                    {
                        {
                            "country_name":"america",
                            "no_of_deaths":50779
                        },
                        {
                            "country_name":"spain",
                            "no_of_deaths":23,768
                        }
                    }
            * /total tested in us -> It will give the response of top 10 states whose having highest tests in us
                    Response body:
                    {
                        {
                            "region":"newyork",
                            "no_of_tests":1,00,786
                        },
                        {
                            "region":"cenada",
                            "no_of_tests":78,987
                        }
                    }
    - POST Routes
            * /signup -> New user
                    Request body:
                    {
                        "name":"user1",
                        "user_id":"123"
                        "email":"user1@gmail.com",
                        "pass":"pass",
                        "admin":"false"
                    }
            * /login -> Authenicate the user
                    Request body:
                    {
                        "name":"username",
                        "email":"user@gmail.com",
                        "pass":"password"
                    }
            * /upload csv files->Admin can only upload csv files into the db
                    Request body:
                    {
                        "email":"admin@gmail.com",
                        "pass":"passadmin"
                    }
                    If these details is successfully authenicate then ready to upload the data from csv to db otherwise will give a error message like
                    Response body:{
                        "message" :"Invalid user"
                    }
