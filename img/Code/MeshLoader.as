/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// MeshLoader tries to build Meshes faster by adding the segments as a bulk operation rather than piecemeal.
//
// Away3D changes:
//		- Make Geometry.addElement arcane.
//		- Geometry._segments needs to be arcane.
//		- Geometry._verticesDirty needs to be arcane.
//		- Geometry.onVertexChange needs to be arcane.
//		- Geometry.onVertexValueChange needs to be arcane.
//
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

package graphics
{
	import away3d.arcane;
	import away3d.core.base.Element;
	import away3d.core.base.Mesh;
	import away3d.core.base.Segment;
	import away3d.loaders.data.MaterialData;
	import away3d.materials.Material;
	
	use namespace arcane;
	
	public class MeshLoader extends Mesh
	{
		public function MeshLoader(init:Object=null)
		{
			super(init);
		}
		
		public function beginLoad():void
		{
			segs = []; // new Vector.<Segment>();
		}
		
		private var nSegs:int = 0;
		
		private var segs:Array = null; // Vector.<Segment> = null;
		
		override public function addSegment(segment:Segment):void
		{
			segment.v0.geometry = segment.v1.geometry = _geometry;
			segment.parent = _geometry;

			segs.push( segment );
		}
		
		public function addMaterial(material:Material):void
		{
			//detect if materialData exists
			if (!(_geometry._materialData = _geometry.materialDictionary[material])) {
				_geometry._materialData = _geometry.materialDictionary[material] = new MaterialData();
				
				//set material property of materialData
				_geometry._materialData.material = material;
				
				//add update listener
				material.addOnMaterialUpdate(_geometry.onMaterialUpdate);
			}
		}
		
		private function addElement(element:Element):void
		{
			element.addOnVertexChange(_geometry.onVertexChange);
			element.addOnVertexValueChange(_geometry.onVertexValueChange);
			element.addOnMappingChange(_geometry.onMappingChange);
			
			element.parent = _geometry;
		}
		
		public function endLoad():void
		{
			_geometry._verticesDirty = true;
			
			for (var i:int=0; i<segs.length; i++) {
				var segment:Segment = segs[i];
				
				_geometry._segments.push(segment);				
			}
						
			_geometry.notifyDimensionsChange();
			
			if(this.parent)
				this.parent.incrementPolyCount(segs.length);
		}
	}
}