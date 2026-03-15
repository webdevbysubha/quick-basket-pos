import sqlite3

try:
    conn = sqlite3.connect('backend/pos.db')
    cursor = conn.cursor()
    
    # Check if column already exists to prevent crash
    cursor.execute("PRAGMA table_info(sale_items)")
    columns = [column[1] for column in cursor.fetchall()]
    
    if 'product_name' not in columns:
        print("Adding product_name column to sale_items table...")
        cursor.execute("ALTER TABLE sale_items ADD COLUMN product_name VARCHAR(100)")
        
        # Retroactively populate old sales with current product names
        print("Populating historical sales with current product names...")
        cursor.execute("""
            UPDATE sale_items 
            SET product_name = (
                SELECT name FROM products WHERE products.id = sale_items.product_id
            )
        """)
        
        conn.commit()
        print("Migration successful!")
    else:
        print("Migration already applied.")

except Exception as e:
    print(f"Error during migration: {e}")
finally:
    if conn:
        conn.close()
