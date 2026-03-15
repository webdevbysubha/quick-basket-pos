from app import create_app
from models.database import db, Product

def seed_data():
    app = create_app()
    with app.app_context():
        print("Clearing database...")
        db.drop_all()
        db.create_all()

        products = [
            Product(name="Apple iPhone 15", barcode="123456789012", price=79900.00, category="Electronics"),
            Product(name="Samsung Galaxy S24", barcode="987654321098", price=89900.00, category="Electronics"),
            Product(name="Logitech Wireless Mouse", barcode="112233445566", price=2999.00, category="Accessories"),
            Product(name="Mechanical Keyboard", barcode="665544332211", price=12000.00, category="Accessories"),
            Product(name="HDMI Cable 2m", barcode="998877665544", price=1550.00, category="Electronics"),
            Product(name="Desk Coffee Mug", barcode="555555555555", price=1200.00, category="Kitchen"),
        ]

        print("Adding products...")
        db.session.add_all(products)
        db.session.commit()
        print(f"Successfully added {len(products)} products to the database.")

if __name__ == '__main__':
    seed_data()
