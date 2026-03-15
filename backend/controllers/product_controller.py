from models.database import db, Product

def get_all_products():
    products = Product.query.all()
    return [p.to_dict() for p in products]

def get_product_by_barcode(barcode):
    product = Product.query.filter_by(barcode=barcode).first()
    if product:
        return product.to_dict()
    return None

def create_product(data):
    try:
        new_product = Product(
            name=data['name'],
            barcode=data['barcode'],
            price=float(data['price']),
            category=data.get('category', '')
        )
        db.session.add(new_product)
        db.session.commit()
        return new_product.to_dict()
    except Exception as e:
        db.session.rollback()
        raise e

def update_product(product_id, data):
    product = Product.query.get(product_id)
    if not product:
        return None
    
    try:
        if 'name' in data:
            product.name = data['name']
        if 'barcode' in data:
            product.barcode = data['barcode']
        if 'price' in data:
            product.price = float(data['price'])
        if 'category' in data:
            product.category = data['category']
            
        db.session.commit()
        return product.to_dict()
    except Exception as e:
        db.session.rollback()
        raise e

def delete_product(product_id):
    product = Product.query.get(product_id)
    if not product:
        return False
    try:
        db.session.delete(product)
        db.session.commit()
        return True
    except Exception as e:
        db.session.rollback()
        raise e
