import data_manager


def get_boards():
    """
    Gather all boards
    :return:
    """
    # remove this code once you implement the database
    # return [{"title": "board1", "id": 1}, {"title": "board2", "id": 2}]

    return data_manager.execute_select(
        """
        SELECT * FROM boards
        ;
        """)


def save_new_board_data(data):
    return data_manager.execute_insert(
        f"""
        WITH ins1 AS (
        INSERT INTO boards (title, type, user_id)
        VALUES (%(board_name)s, %(type)s, %(userid)s)
        RETURNING id)
        INSERT INTO columns (title, board_id)
        VALUES {create_query_values(data)};
        SELECT id, type 
        FROM boards
        GROUP BY id
        HAVING id = max(id);
        """, generate_query_dict(data))



def create_query_values(data):
    column_dict = data.get('columns')
    columns_names = list(column_dict.values())
    values_string = ''
    for name in columns_names:
        if columns_names.index(name) < len(columns_names)-1:
            values_string += f'(%(col{columns_names.index(name)})s, (SELECT id FROM ins1)),'
        else:
            values_string += f'(%(col{columns_names.index(name)})s, (SELECT id FROM ins1))'
    return values_string


def generate_query_dict(data):
    query_dict = {'userid': data.get('userid'), 'type': data.get('type'), 'board_name': data.get('boardTitle')}
    columns_names = list(data.get('columns').values())
    for name in columns_names:
        query_dict[f'col{columns_names.index(name)}'] = name
    return query_dict