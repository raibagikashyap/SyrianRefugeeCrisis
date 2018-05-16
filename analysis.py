import pandas as pd
pd.set_option('display.float_format', lambda x: '%.3f' % x)

### Time Series Data
total_refugees = pd.read_csv('mainfigure.csv')

print(total_refugees.describe())

# Pre war data - 2006 to 2010
prewar_total = total_refugees[total_refugees.Year < 2011]
print(prewar_total.describe())

# Post war data - 2006 to 2011
duringwar_total = total_refugees[total_refugees.Year > 2010]
print(duringwar_total.describe())

### Refugee Type Data
refug_type = pd.read_csv('refugeetype.csv')

print(refug_type.describe())

# Pre war data - 2006 to 2010
prewar_rtype = refug_type[refug_type.RefugeeType < 2011]
print(prewar_rtype.describe())

# Post war data - 2006 to 2011
duringwar_rtype = refug_type[refug_type.RefugeeType > 2010]
print(duringwar_rtype.describe())

### Refugee Status Data
refug_status = pd.read_csv('refugeestatus1.csv')

print(refug_status.describe())

# Pre war data - 2006 to 2010
prewar_rstatus = refug_status[refug_status.Year < 2011]
print(prewar_rstatus.describe())

# Post war data - 2006 to 2011
duringwar_rstatus = refug_status[refug_status.Year > 2010]
print(duringwar_rstatus.describe())