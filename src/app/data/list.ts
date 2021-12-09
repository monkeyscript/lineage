export const List: {
    id      :   string,
    name    :   string,
    parent  :   string[],
    bday    :   string,
} [] = [
    {
        id      :   'P_1',
        name    :   'Rahul R',
        parent  :   ['P_3', 'P_4'],
        bday    :   '2015-03-25',
    },
    {
        id      :   'P_2',
        name    :   'Aparna R',
        parent  :   ['P_3', 'P_4'],
        bday    :   '2015-03-25',
    },
    {
        id      :   'P_3',
        name    :   'Rajagopalan V',
        parent  :   [],
        bday    :   '2015-12-25',
    },
    {
        id      :   'P_4',
        name    :   'Lalitha Devi PT',
        parent  :   [],
        bday    :   '2015-12-21',
    },
]
