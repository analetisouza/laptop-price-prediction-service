import numpy as np
import pandas as pd
from pandas.api.types import is_datetime64_any_dtype as is_datetime

class exploration:

    def fix_columns_name(df, connector): #types : dataframe, string
        df.columns = df.columns.str.replace(' ', connector)
        df.columns = df.columns.str.lower()
        return df

    def remove_columns(df, columns): #types : dataframe, list of strings
        df = df.drop(columns, axis=1, errors='ignore')
        return df

    def keep_columns(df, columns): #types : dataframe, list of strings
        for item in df.columns:
            if item not in columns:
                df = df.drop(item, axis=1)
        return df
    
    def lowercase_values(df, columns):
        for item in columns:
                df.loc[item] = df.apply(lambda x: x[item].str.lower(), axis=1)
        return df

    def transform_column_type(df, columns, new_type):
        if new_type == 'str':
            df[columns] = df[columns].astype(str)
        elif new_type == 'int':
            df[columns] = df[columns].astype(int)  
        elif new_type == 'float':
            df[columns] = df[columns].apply(pd.to_numeric)
        elif new_type == 'datetime':
            df[columns] = df[columns].astype(str)
            df[columns] = df[columns].apply(pd.to_datetime)
        return df

    def remove_null_items(df, column): #types : dataframe, string
        df.drop(df[df[column].notnull() == False].index, inplace=True)
        return df

    def remove_specific_items(df, column, items): #types : dataframe, string, list of any type (but has to be the same as the one present in the column)
        for current in range(len(items)):
            df.drop(df[df[column] == items[current]].index, inplace=True)
        return df

    def calculate_date_difference(df, columns, new_column, period): #types : dataframe, list of two strings (most recent date first), string, string
        for item in range(2):
            if not is_datetime(df[columns[item]]):
                df[columns[item]] = pd.to_datetime(df[columns[item]].astype(str))

        df.drop(df[df[columns[0]] <= df[columns[1]]].index, inplace=True)
        
        df[new_column] = df[columns[0]].dt.to_period(period).astype(int) - df[columns[1]].dt.to_period(period).astype(int)
        return df

    def get_data_by_value(df, column, data_column):
        values_list = dict()

        # Drop columns that dont have value in column defined
        df = df.dropna(subset = [column])

        # List of different values in column
        column_values = df[column].unique()
        column_values.sort()

        # Group for each value and calculate mean
        for value in column_values:
            values_list[value] = df.loc[df[column] == value][data_column]

        return values_list

    def groupByColumn(df, column):
        averageDict = dict()

        # Drop columns that dont have value in column defined
        df = df.dropna(subset = [column])

        # List of different values in column
        valuesOfColumn = df[column].unique()
        valuesOfColumn.sort()

        # Group for each value and calculate mean
        for value in valuesOfColumn:
            averageDict[value] = df.loc[df[column] == value]['Days_To_Go_Live'].mean()

        return averageDict

    def groupByYearRange(df, startYear, endYear):
        averageOnYearDict = dict()

        # Drop columns that dont have value in column 'ACV Date' defined
        df = df.dropna(subset = ['ACV_Date'])

        # Get the year of beggining of Go Live process
        df['ACV_Date_Year'] = pd.DatetimeIndex(df['ACV_Date']).year

        # Get mean for each year
        for year in range(startYear, endYear + 1):
            averageOnYearDict[year] = df.loc[df['ACV_Date_Year'] == year]['Days_To_Go_Live'].mean()

        return averageOnYearDict