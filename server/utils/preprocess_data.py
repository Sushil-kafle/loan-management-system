def preprocess_data(df):
    df["Gender"] = df["Gender"].map({"Male": 1, "Female": 0}).astype(int)
    df["Dependents"] = df["Dependents"].replace(to_replace="3+", value="4")
    df["Married"] = df["Married"].map({"Yes": 1, "No": 0}).astype(int)
    df["Education"] = (
        df["Education"].map({"Graduate": 1, "Not Graduate": 0}).astype(int)
    )
    df["Self_Employed"] = df["Self_Employed"].map({"Yes": 1, "No": 0}).astype(int)
    df["Property_Area"] = (
        df["Property_Area"].map({"Rural": 0, "Semiurban": 1, "Urban": 2}).astype(int)
    )
    df["Credit_History"] = df["Credit_History"].map({"Yes": 1, "No": 0}).astype(int)
    return df
