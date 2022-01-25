import data_manager

def get_columns(board_id):
    matching_columns = data_manager.execute_select(
        """
        SELECT * FROM columns
        WHERE columns.board_id = %(board_id)s
        ;
        """
        , {"board_id": board_id})

    return matching_columns
