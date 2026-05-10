import { ServiceDivisionDetailPage } from "@/components/service-division-detail-page"
import { getServiceDivisionDetailData, getStaticServiceDivisionDetailData } from "@/lib/api/service-division-detail"

export default async function ProductsPage() {
  try {
    return <ServiceDivisionDetailPage data={await getServiceDivisionDetailData("products")} />
  } catch (error) {
    console.error("Failed to fetch products division:", error)
    return <ServiceDivisionDetailPage data={getStaticServiceDivisionDetailData("products")} />
  }
}
