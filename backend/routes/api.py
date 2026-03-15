from flask import Blueprint, request, jsonify
from controllers import product_controller, sale_controller

api_bp = Blueprint('api', __name__)

# --- Product Routes ---

@api_bp.route('/products', methods=['GET'])
def get_products():
    return jsonify(product_controller.get_all_products())

@api_bp.route('/products/barcode/<barcode>', methods=['GET'])
def lookup_product(barcode):
    product = product_controller.get_product_by_barcode(barcode)
    if product:
        return jsonify(product)
    return jsonify({'error': 'Product not found'}), 404

@api_bp.route('/products', methods=['POST'])
def add_product():
    data = request.json
    try:
        product = product_controller.create_product(data)
        return jsonify(product), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@api_bp.route('/products/<int:id>', methods=['PUT'])
def update_product(id):
    data = request.json
    try:
        product = product_controller.update_product(id, data)
        if product:
            return jsonify(product)
        return jsonify({'error': 'Product not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@api_bp.route('/products/<int:id>', methods=['DELETE'])
def delete_product(id):
    success = product_controller.delete_product(id)
    if success:
        return jsonify({'message': 'Product deleted successfully'})
    return jsonify({'error': 'Product not found'}), 404

# --- Sale Routes ---

@api_bp.route('/sales', methods=['GET'])
def get_sales():
    return jsonify(sale_controller.get_all_sales())

@api_bp.route('/sales', methods=['POST'])
def create_sale():
    data = request.json
    try:
        sale = sale_controller.create_sale(data)
        return jsonify(sale), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400
