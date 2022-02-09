import data_manager


def get_column_new_for_board(board_id, name):
    return data_manager.execute_select(
        """
        SELECT id FROM columns
        WHERE columns.board_id = %(board_id)s
        AND columns.title = %(name)s
        ;
        """
        , {"board_id": board_id, "name": name}, fetchall=False)


def get_columns(board_id):
    return data_manager.execute_select(
        """
        SELECT * FROM columns
        WHERE columns.board_id = %(board_id)s
        ;
        """, {"board_id": board_id})
    return matching_columns


def add_new_column(board_id, title):
    new_column = data_manager.execute_insert(
        """
        INSERT INTO columns
        (title, board_id)
        VALUES (%(title)s, %(board_id)s)
        RETURNING id;
        """, {"title": title,
              "board_id": board_id})
    return new_column


def delete_column(column_id):
    column_to_delete = data_manager.execute_delete(
        """
        DELETE FROM columns
        WHERE id = %(column_id)s;
        """, {'column_id': column_id})
    return column_to_delete


def rename_column(column_id, title):
    new_column_name = data_manager.execute_edit(
        """
        WITH UPDATED AS
            (UPDATE columns
            SET title = %(title)s
            WHERE id = %(column_id)s
            RETURNING id)
        SELECT *
        FROM columns
        ORDER BY id ASC;
        """, {'column_id': column_id, 'title': title})
    return new_column_name