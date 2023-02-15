---
title: Using BIRCH for anomaly detection with QuestDB
author: Fortune Adekogbe
author_title: Guest post
author_url: https://www.linkedin.com/in/fortune-adekogbe-a81580176/
author_image_url: https://dl.airtable.com/.attachments/b724b9a7673c042ba94578be8db94b6f/438d3a79/20210724_135234.jpg?userId=usrLQ2kaNUqxOmv9c
description:
  How to install BIRCH for anomaly detection with QuestDB
keywords:
  - birch
  - anomaly detection
  - python

image: /img/blog/2022-08-22/banner.png
tags: [birch, anomaly detection, python, tutorial]
---

import Banner from "@theme/Banner"

<Banner
  alt="detecting the black sheep"
  height={360}
  src="/img/blog/2022-08-22/banner.png"
  width={650}
></Banner>

In this article, [Fortune Adekogbe](https://www.linkedin.com/in/fortune-adekogbe-a81580176/) introduces how to use the BIRCH algorithm for visual clustering, which assists anomaly detection in QuestDB.

<!--truncate-->

Balanced Iterative Reducing and Clustering using Hierarchies (BIRCH) refers to an unsupervised learning algorithm that is used to group data so that each group contains similar data points. It works well on large datasets because it minimizes the number of passes through the entire dataset, making the process more efficient.

BIRCH is also used in scikit-learn, the popular Python package that makes machine learning algorithms available for quick and easy use. Scikit-learn contains state-of-the-art implementations of all kinds of algorithms (probabilistic, tree-based, ensemble) that can help you solve supervised (regression, classification) and unsupervised (clustering, anomaly detection) learning-related problems. It offers a range of submodules to help with processing and transforming data before modeling, as well as understanding the results after modeling.

BIRCH with scikit-learn can be used to solve clustering and anomaly detection-related problems. In this tutorial, you will learn more about BIRCH. You will also learn how to set up and load data into QuestDB and how to implement BIRCH to solve an anomaly detection problem in Python.

For reference, you can check [the GitHub repository](https://github.com/Fortune-Adekogbe/birch-anomaly-detection) for this tutorial.

## What is BIRCH?

The BIRCH algorithm uses a data structure known as a tree to process data and generate clusters. 

The algorithm first takes in a series of (`N`) data points, which are essentially real-valued vectors. These vectors could be the data directly or the result of a transformation of the original data after pre-processing. The desired number of clusters (`K`) and threshold are also parsed as optional parameters. 

### Planting the tree

The first part of the algorithm involves building the clustering feature tree. Each cluster feature, as the name implies, is a concise representation of the vectors in any given cluster and is a tuple of three values. In these tuples you have: the number of vectors in the cluster (`N<sub>J</sub>`), the sum of all vectors in the cluster (`LS`), and the sum of the square of all vectors in the cluster (`SS`). These values help you compute the centroid and radius of the clusters.  

Taking in data point after data point, you can construct the tree by making sure that higher-level nodes are a summary of the clusters in the lower levels. This means the elements on the lowest level, or the leaf node, contain low diameter clusters. On the next level up, these low diameter clusters (which are summaries of data points) are also summarized into several cluster features. Each node from root to leaf holds several cluster features; this value can be specified as the branching factor. Ultimately, you have several low diameter clusters on the bottom level (leaf nodes) and their condensed representations on higher-level clusters.

### Trivializing the clustering process

Next, for each cluster in each leaf node, you compute the centroid by dividing the second element in the cluster feature `LS` tuple by the first `N<sub>J</sub>`. The resulting values are a low dimensional representation of the original dataset. This low dimensional data is then clustered using an agglomerative hierarchical clustering algorithm into K clusters (alternatively, the desired diameter of the clusters can be specified), and the centroid of these new clusters is computed. 

Each data point in the original dataset is checked against these K centroids and gets assigned to the cluster of whichever centroid it is closest to. You can also label points that are too far from their closest cluster as outliers.

### Applications of BIRCH

BIRCH, which is an unsupervised learning technique, is used to cluster data in groups of similar data points. Doing this allows you to better understand the data distribution and use it to make decisions. Clustering is used in customer segmentation, data labeling, and document analysis, among other use cases. BIRCH is especially useful in clustering because it allows you to efficiently group data points without any explicit knowledge about a target class.  

BIRCH is also useful in the field of anomaly detection. This involves the identification of data points that deviate from a given norm, do not satisfy some requirements, and are essentially undesired. When you have a lot of data points, you use anomaly detection to identify those that stand out. This is useful in identifying defective products, ensuring predictive maintenance of industrial equipment, and detecting cyber-intrusion and fraud.

## Implementing BIRCH and QuestDB

To better understand BIRCH and how it can be used with QuestDB, you will solve a sample anomaly detection problem. 

### Setting up QuestDB 

You have several options for installing QuestDB, including Docker and Homebrew. [Check the documentation](/docs) for details.

Once QueestDB is installed, you can access the web console of the running service, by opening your browser and going to `http://localhost:9000`. You should see the below image:

import Screenshot from "@theme/Screenshot"

<Screenshot
  alt="A screenshot of the QuestDB web console."
  height={650}
  src="/img/blog/2022-08-22/web_console.png"
  width={770}
/>

Now that QuestDB is set up, the next step is getting data into the database.

### Importing Data

The sample data that will be used is the SKAB data created by [Skoltech](https://www.skoltech.ru/en). It contains eleven attributes that refer to various physical and chemical properties of a testbed. The data can be accessed and downloaded [here](https://www.kaggle.com/datasets/caesarlupum/benckmark-anomaly-timeseries-skab). 

Once it’s downloaded, navigate to the upload page on the QuestDB web console as shown below and select the dataset file.

<Screenshot
  alt="A screenshot of the QuestDB web console upload section."
  height={591}
  src="/img/blog/2022-08-22/upload.png"
  width={770}
/>

> Note: There are different ways to import CSV files into QuestDB. For more information, please see [Insert data](/docs/develop/insert-data).

Go back to the home page and refresh the table list to see the data upload reflected. On this page, you can run SQL queries to explore the data.

<Screenshot
  alt="A screenshot of the QuestDB web console showing uploaded table."
  height={950}
  src="/img/blog/2022-08-22/alldata_skab.png"
  width={770}
/>

### Setting up Python Environment and Installing Scikit-learn

Now that the data is set up on QuestDB, create a folder locally and open it in your preferred code editor or IDLE. As should be done with all Python projects, you create and activate a virtual environment named `.venv` by running the commands below:

```
python -m venv .venv

.venv\Scripts\activate.bat
```
With the environment set up, you can now install the required libraries. 

```
pip install requests numpy pandas sklearn matplotlib
```

You will be using the requests library to get the data from QuestDB. Then you will need the pandas library to handle and pre-process the data. The scikit-learn library `sklearn` is needed because it contains an implementation of the BIRCH algorithm and other relevant functions. 

> Note: Any package used that isn’t installed here is either pre-installed with Python or installed as a dependency of the packages listed above.

### Getting data from QuestDB via Python

Run the following code to get the data: 

```python
import requests

import pandas as pd

import numpy as np
import json

HOST = 'http://localhost:9000'

def execute_query(query_sql: str) -> pd.DataFrame:

    query_params = {'query': query_sql, 'fmt' : 'json'}

    try:

        response = requests.get(HOST + '/exec', params=query_params)

        json_response = json.loads(response.text)

        skab_df = pd.DataFrame(data=json_response['dataset'], columns=[i['name'] for i in json_response['columns']])

        return skab_df

    except KeyError:

        print(json_response['error'])

    except requests.exceptions.RequestException as e:

        print(f"Error: {e}")

skab_df = execute_query("SELECT * FROM alldata_skab.csv WHERE anomaly IN ('0.0', '1.0');")

```

In the above code, you import `requests`, `pandas`, and `json` into the script and assign the console web address to a variable named `HOST` (in this case).

To get the data into a Python script, a function is created and the requests library is used to access a REST API made available by QuestDB. This is done by creating a function named `execute_query` that takes in a SQL query as a string and returns a pandas dataframe object. 

In the `execute_query` function, first you define the request query parameters, which are the SQL query and the desired format `fmt` of the response. The `exec` endpoint is added to the `HOST` URL parsed into the `requests.get` function alongside the parameters. The text in the response from this request is loaded via the `json.loads` method as a Python dictionary. 

This dictionary contains two keys that are significant here. The first is the `columns` and the second is the `dataset`. The corresponding values of these keys are used to instantiate a pandas dataframe called `skab_df`. This dataframe is then returned.

This is all brought together by calling the function and parsing an SQL query into it. This query selects all the data points with anomaly attributes of either `’0.0’` or `’1.0’` to avoid null values.

In case the request was not successful, a try-except statement is used to catch and communicate the error message.

### Pre-processing the data

Next run these commands: 

```python
def process_data(df: pd.DataFrame) -> tuple:

    del df['changepoint']

    df = df.astype({'anomaly':'float'}).astype({'anomaly':'int'})

    df.set_index('datetime', inplace=True)

    anomaly = df['anomaly']

    del df['anomaly']

    return df, anomaly

skab_df, anomaly = process_data(skab_df)

skab_df = np.ascontiguousarray(skab_df)

```

Even with the earlier mentioned SQL query, the data is not in pristine form for clustering. In the above code, to clean and process the data, you create a function named `process_data` that takes in the original dataframe and returns a tuple containing the cleaned version and the anomaly attribute.

You start by removing the `changepoint` attribute since you will be focusing on the `anomaly` attribute. Next, you change the data type of the `anomaly` attribute to `int` by first changing it to a float. This is because the strings in this case cannot be directly converted into integers. With that done, you set the `datetime` column as the index, assign the `anomaly` attribute to a new variable, and remove it from the dataframe.

The modified dataframe and the anomaly series are then returned as a tuple. To make `skab_df` `C-contiguous` and avoid an error, the `np.ascontiguousarray` method is used.

<Screenshot
  alt="Modified dataframe and anomaly series."
  height={591}
  src="/img/blog/2022-08-22/modified_dataframe.png"
  width={770}
/>

### Clustering and anomaly detection

Run the following commands: 

```python

import numpy as np

import matplotlib.pyplot as plt

from sklearn.decomposition import PCA

from sklearn.cluster import Birch

from sklearn.metrics import confusion_matrix

birch_model = Birch(n_clusters=2, threshold=1.5)

birch_model.fit(skab_df)

labels = birch_model.labels_

def get_labels(labels: list) -> list:

    l, c = np.unique(labels, return_counts=True)

    print(l,c)

    mini = l[np.argmin(c)]

    return np.array([i==mini for i in labels], dtype='int64')

pred = get_labels(labels)

```

With the processed data, you can now create clusters and detect anomalies. First you import the required modules from `sklearn` and `matplotlib`. You define the `Birch` model parsing in two arguments: the number of clusters as `2` and the radius threshold as `1.5`. After this, you fit the model to the data and get the cluster labels using the `.labels_` method.  

A function named `get_labels` is defined, which uses NumPy to get the cluster with the smaller number of data points and assign it the anomaly tag. The resulting modified labels are stored in a variable `pred`.

```python

def plot_anomaly_distribution(labels: list, df: pd.DataFrame) -> None:

    X = PCA(n_components=2).fit_transform(df)

    plt.scatter(X[:,0], X[:,1], c=labels, cmap='rainbow', alpha=0.7, edgecolors='b')

    plt.title("Anomaly Distribution on SKAB Data using BIRCH")

    plt.show()

cm = confusion_matrix(anomaly, pred)

print(f"Anomalies detected: {cm[1][1]/sum(cm[1])}")

#plot result

plot_anomaly_distribution(labels, skab_df)

```

To better understand the results, a function is created to plot the anomaly distribution in 2D. Since the data is multivariate, principal component analysis (PCA) is used to transform the data and reduce its dimensionality to two. A scatter plot is then created and displayed using these reduced features:

<Screenshot
  alt="Modified dataframe and anomaly series."
  height={591}
  src="/img/blog/2022-08-22/scatter_plot.png"
  width={770}
/>

In the plot above, red and blue circles represent the detected anomalous data points and the other data points respectively. 

<Screenshot
  alt="Modified dataframe and anomaly series."
  height={591}
  src="/img/blog/2022-08-22/confusion_matrix.png"
  width={770}
/>

A confusion matrix method is also used to assess the performance of the model. It is able to identify 39.9 percent of the anomalies:

```
5248/(7917+5248) = 0.39857
```

To visualize this as the image shown above, run the following lines of code:

```python
from sklearn.metrics import ConfusionMatrixDisplay
disp = ConfusionMatrixDisplay(confusion_matrix=cm)
disp.plot()
plt.show()
```

For improved performance, the data can be pre-processed further and the model parameters can be tuned.

## Conclusion

You should now have a better understanding of the BIRCH algorithm, how it works, and how to implement it for anomaly detection. You have also learned how to set up QuestDB for data storage and to connect it to Python via a REST API. 

You can use this process to more efficiently analyze large datasets in order to optimize machine learning in your data-driven projects. 

To check your work in this tutorial, consult the [GitHub repository](https://github.com/Fortune-Adekogbe/birch-anomaly-detection).

